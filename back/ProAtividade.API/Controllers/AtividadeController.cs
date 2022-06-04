using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Data;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : Controller
    {
   
        private readonly DataContext _context;

        public AtividadeController(DataContext context)
        {
            this._context = context;           
        }



        [HttpGet]
        // Retorna as atividades do banco de dados
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
        }


        [HttpGet("{id}")]
        // Retorna a atividade referente ao ID
        public Atividade Get(int id)
        {
            return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
        }


        [HttpPost]
        // Adiciona um atividade
        public IEnumerable<Atividade> Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);

            if (_context.SaveChanges() > 0)
                return _context.Atividades; // inseriu uma e retorna todas
            else
                throw new Exception("Não foi possível adicionar uma nova atividade!");
        }


        [HttpPut("{id}")]
        // Atualiza uma atividade
        public Atividade Put(int id, Atividade atividade)
        {
            if (atividade.Id != id)
                throw new Exception("Você esta tentando atualizar a atividade errada!");

            // se id correto, prossegue

            _context.Update(atividade);

            if (_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
            else
                return new Atividade();
        }



        [HttpDelete("{id}")]
        // Exclui uma atividade
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);

            if (atividade == null)
                throw new Exception("Você esta tentando excluir uma atividade inválida!");

            _context.Remove(atividade);

            return _context.SaveChanges() > 0;
        }


    }
}