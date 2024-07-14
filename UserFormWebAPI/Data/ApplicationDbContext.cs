using Microsoft.EntityFrameworkCore;
using UserFormWebAPI.Models;

namespace UserFormWebAPI.Data
{
    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
    }
}
