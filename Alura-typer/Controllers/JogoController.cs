using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Microsoft.Ajax.Utilities;
using Alura.Models;
using Alura_typer.Models;

namespace Alura.Controllers
{
    


    public class JogoController : Controller
    {
        Contexto db = new Contexto();


        // GET: Jogo
        public ActionResult Index()
        {
            return View();
        }

      //  [HttpPost] mudar para get
        public JsonResult metodGetFrase(int? Id)
        {
            List<string> list = new List<string>();
            var frase = new Contexto().Frases.FirstOrDefault(x => x.id == Id);//obtem frase do banco

            list.Add(frase.frase);//isenre frase na pos 0
            list.Add(frase.tempo.ToString()); // insere frase na pos 1
           
             
                return Json( list,JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult salvaPlacar(Placar[] placar)
        {
            List<string> list = new List<string>();

            foreach (var item in placar)
            {
                //list.Add(item.pontos.ToString());
                //list.Add(item.usuario);
                db.Placar.Add(placar[0]);//corrigir/ inserire so na posicao 0
                db.SaveChanges();
            }

            return Json( JsonRequestBehavior.AllowGet);
           
        }

      

    }




}

   