using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Alura.Models;

namespace Alura_typer.Controllers
{
    public class FrasesController : Controller
    {
        private Contexto db = new Contexto();

        // GET: Frases
        public ActionResult Index()
        {
            return View(db.Frases.ToList());
        }

        // GET: Frases/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Frases frases = db.Frases.Find(id);
            if (frases == null)
            {
                return HttpNotFound();
            }
            return View(frases);
        }

        // GET: Frases/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Frases/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,frase,tempo")] Frases frases)
        {
            if (ModelState.IsValid)
            {
                db.Frases.Add(frases);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(frases);
        }

        // GET: Frases/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Frases frases = db.Frases.Find(id);
            if (frases == null)
            {
                return HttpNotFound();
            }
            return View(frases);
        }

        // POST: Frases/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,frase,tempo")] Frases frases)
        {
            if (ModelState.IsValid)
            {
                db.Entry(frases).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(frases);
        }

        // GET: Frases/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Frases frases = db.Frases.Find(id);
            if (frases == null)
            {
                return HttpNotFound();
            }
            return View(frases);
        }

        // POST: Frases/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Frases frases = db.Frases.Find(id);
            db.Frases.Remove(frases);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
