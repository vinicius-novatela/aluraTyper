using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Alura.Models;


namespace Alura.Models
{
    using System.Data.Entity;
    using System.Security.Cryptography.X509Certificates;

    public class Contexto : DbContext
    {
        public Contexto (): base("DefaultConnection")
        {
        }

         public  DbSet<Frases> Frases { get; set; }

     }

     
}
