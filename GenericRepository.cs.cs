using KPMG.CI.CompetitiveIntelligence.Model;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics.Contracts;
using System.Linq;

namespace KPMG.CI.CompetitiveIntelligence.DataBase
{
    public class GenericRepository<T> where T : BaseEntity
    {
        public AdvisoryContext CurrentContext { get; set; }
        private readonly IDbSet<T> dbset = null;

        /// <summary>
        /// For initialise context variable and dbset
        /// </summary>
        public GenericRepository()
        {
            CurrentContext = new AdvisoryContext();
            dbset = CurrentContext.Set<T>();
        }

        /// <summary>
        /// For save the context data into database
        /// </summary>
        public void Commit()
        {
            CurrentContext.SaveChanges();

        }

        /// <summary>
        /// Fot adding particulat generic class context data
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual T Add(T entity)
        {
            Contract.Requires(entity != null);

            dbset.Add(entity);
            CurrentContext.SaveChanges();
            return entity;
        }


        /// <summary>
        /// For update the context value
        /// </summary>
        /// <param name="entity"></param>
        public virtual T Update(T entity)
        {
            Contract.Requires(entity != null);

            dbset.Attach(entity);
            CurrentContext.Entry(entity).State = EntityState.Modified;
            CurrentContext.SaveChanges();
            return entity;
        }


        /// <summary>
        /// Get the context data by long id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual T GetById(long id)
        {
            return dbset.Find(id);
        }

        /// <summary>
        /// Get the context data by string id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual T GetById(string id)
        {
            Contract.Requires(id != null);

            return dbset.Find(id);
        }

        /// <summary>
        /// get all context data
        /// </summary>
        /// <returns></returns>
        public virtual IEnumerable<T> GetAll()
        {
            return dbset.Where(c => c.RecordStatus == true).ToList();
        }

        public virtual ViewModels.PagedDataViewModel<T> GetAll(int pageSize, int skip)
        {
            ViewModels.PagedDataViewModel<T> entity = new ViewModels.PagedDataViewModel<T>();
            var entities = dbset.Where(t => t.RecordStatus == true).AsEnumerable();
            entity.Total = entities.Count();
            entity.Data = entities.Skip(skip).Take(pageSize);
            return entity;
        }

        /// <summary>
        /// delete a particular context data
        /// </summary>
        /// <param name="entity"></param>
        public virtual bool Delete(T entity)
        {
            Contract.Requires(entity != null);

            entity.RecordStatus = false;
            dbset.Attach(entity);
            CurrentContext.Entry(entity).State = EntityState.Modified;
            CurrentContext.SaveChanges();
            return true;
        }
        public virtual bool Delete(int id)
        {
            bool status = false;
            if (id > 0)
            {
                var entity = dbset.Find(id);
                if (entity != null)
                {
                    entity.RecordStatus = false;
                    dbset.Attach(entity);
                    CurrentContext.Entry(entity).State = EntityState.Modified;
                    CurrentContext.SaveChanges();
                    status = true;
                }
            }
            return status;
        }
        public virtual bool Delete(long id)
        {
            bool status = false;
            if (id > 0)
            {
                var entity = dbset.Find(id);
                if (entity != null)
                {
                    entity.RecordStatus = false;
                    dbset.Attach(entity);
                    CurrentContext.Entry(entity).State = EntityState.Modified;
                    CurrentContext.SaveChanges();
                    status = true;
                }
            }
            return status;
        }
    }

}

