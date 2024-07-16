using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserFormWebAPI.Data;
using UserFormWebAPI.Models;

namespace UserFormWebAPI.Controllers
{
    [Route("api/user/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(User user)
        {
            if (ModelState.IsValid)
            {
                await _context.Users.AddAsync(user);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return Ok(user);
                }

                return BadRequest();
            }
            return BadRequest(ModelState);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetByIdAsync(int id)
        {
            if (id == 0)
            {
                return NotFound();
            }
            return Ok(await _context.Users.FirstOrDefaultAsync(u => u.Id == id));
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (existingUser == null)
            {
                return BadRequest("Student not found");
            }

            existingUser.Name = user.Name;
            existingUser.Address = user.Address;
            existingUser.PhoneNumber = user.PhoneNumber;
            existingUser.Email = user.Email;

            _context.Update(existingUser);
            var result = await _context.SaveChangesAsync();

            if (result > 0)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not available for this id");
            }

            _context.Users.Remove(user);
            var result = await _context.SaveChangesAsync();
            
            if(result > 0)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
