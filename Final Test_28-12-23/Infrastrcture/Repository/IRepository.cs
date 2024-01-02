using System.Linq.Expressions;

namespace Infrastrcture.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
        Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match, params Expression<Func<T, object>>[] includes);

    }
}
