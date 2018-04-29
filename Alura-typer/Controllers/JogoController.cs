using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Microsoft.Ajax.Utilities;
using Alura.Models;



namespace Alura.Controllers
{



    public class JogoController : Controller
    {
        // GET: Jogo
        public ActionResult Index()
        {
            return View();
        }

      //  [HttpPost]
        public JsonResult metodGetFrase(int? Id)
        {
            List<string> list = new List<string>();
            var frase = new Contexto().Frases.FirstOrDefault(x => x.id == Id);

            list.Add(frase.frase);
            list.Add(frase.tempo.ToString());
            //if (frase != null)
            //{
             
                return Json( list,JsonRequestBehavior.AllowGet);

            //}

            //return null;

        }


    }




}

   