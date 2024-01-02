using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastrcture.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbContext _context;

        public Repository(DbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            List<T> entities = await _context.Set<T>().ToListAsync();
            return entities;
        }


        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task AddAsync(T entity)
        {
            _ = await _context.Set<T>().AddAsync(entity);
            _ = await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _ = await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            T? entity = await _context.Set<T>().FindAsync(id);
            if (entity != null)
            {
                _ = _context.Set<T>().Remove(entity);
                _ = await _context.SaveChangesAsync();
            }
        }

        public async Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>().Where(match).AsQueryable();

            foreach (Expression<Func<T, object>> include in includes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();
        }

    }
}
