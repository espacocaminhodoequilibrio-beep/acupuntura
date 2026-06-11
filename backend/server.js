require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_KEY = process.env.ADMIN_KEY || "troque-esta-chave";
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "").split(",").map(o => o.trim()).filter(Boolean);
app.use(cors({ origin(origin, callback){ if(!origin || allowedOrigins.length===0 || allowedOrigins.includes(origin)) return callback(null,true); return callback(new Error("Origem não permitida pelo CORS")); }}));
app.use(express.json());
const depoimentoSchema = new mongoose.Schema({
  nome:{type:String,required:true,trim:true,maxlength:80},
  cidade:{type:String,trim:true,maxlength:80},
  nota:{type:Number,min:1,max:5,default:5},
  comentario:{type:String,required:true,trim:true,maxlength:1000},
  aprovado:{type:Boolean,default:false}
},{timestamps:true});
const Depoimento = mongoose.model("Depoimento", depoimentoSchema);
function validarAdmin(req,res,next){ if(req.headers["x-admin-key"] !== ADMIN_KEY) return res.status(401).json({erro:"Acesso não autorizado"}); next(); }
app.get("/", (req,res)=>res.json({status:"API de depoimentos funcionando"}));
app.post("/api/depoimentos", async (req,res)=>{ try{ const {nome,cidade,nota,comentario}=req.body; if(!nome||!comentario) return res.status(400).json({erro:"Nome e comentário são obrigatórios"}); const depoimento=await Depoimento.create({nome,cidade,nota,comentario,aprovado:false}); res.status(201).json({mensagem:"Depoimento enviado com sucesso. Ele será analisado antes de aparecer no site.",depoimento}); }catch(e){ res.status(500).json({erro:"Erro ao salvar depoimento", detalhe:e.message}); }});
app.get("/api/depoimentos", async (req,res)=>{ try{ const dados=await Depoimento.find({aprovado:true}).sort({createdAt:-1}).limit(20).select("nome cidade nota comentario createdAt"); res.json(dados); }catch(e){ res.status(500).json({erro:"Erro ao listar depoimentos", detalhe:e.message}); }});
app.get("/api/admin/depoimentos", validarAdmin, async (req,res)=>{ try{ res.json(await Depoimento.find().sort({createdAt:-1})); }catch(e){ res.status(500).json({erro:"Erro ao listar depoimentos", detalhe:e.message}); }});
app.patch("/api/admin/depoimentos/:id/aprovar", validarAdmin, async (req,res)=>{ try{ const d=await Depoimento.findByIdAndUpdate(req.params.id,{aprovado:true},{new:true}); if(!d) return res.status(404).json({erro:"Depoimento não encontrado"}); res.json({mensagem:"Depoimento aprovado", depoimento:d}); }catch(e){ res.status(500).json({erro:"Erro ao aprovar depoimento", detalhe:e.message}); }});
app.patch("/api/admin/depoimentos/:id/reprovar", validarAdmin, async (req,res)=>{ try{ const d=await Depoimento.findByIdAndUpdate(req.params.id,{aprovado:false},{new:true}); if(!d) return res.status(404).json({erro:"Depoimento não encontrado"}); res.json({mensagem:"Depoimento ocultado", depoimento:d}); }catch(e){ res.status(500).json({erro:"Erro ao ocultar depoimento", detalhe:e.message}); }});
app.delete("/api/admin/depoimentos/:id", validarAdmin, async (req,res)=>{ try{ const d=await Depoimento.findByIdAndDelete(req.params.id); if(!d) return res.status(404).json({erro:"Depoimento não encontrado"}); res.json({mensagem:"Depoimento removido"}); }catch(e){ res.status(500).json({erro:"Erro ao remover depoimento", detalhe:e.message}); }});
async function iniciar(){ if(!MONGODB_URI){ console.error("Configure MONGODB_URI"); process.exit(1); } await mongoose.connect(MONGODB_URI); console.log("MongoDB conectado"); app.listen(PORT,()=>console.log(`API rodando na porta ${PORT}`)); }
iniciar().catch(e=>{ console.error(e); process.exit(1); });
