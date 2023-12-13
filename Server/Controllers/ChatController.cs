using Microsoft.AspNetCore.Mvc;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private IMessageService _messageService;
        private IMessageRepository _messageRepository;

        public ChatController(IMessageService messageService, IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
            _messageService = messageService;
        }

        [HttpPost]
        [Route("send")]
        //[Authorize]
        public async Task<IActionResult> CreateNewAnalysis(SendMessageRequest request, CancellationToken token)
        {
            try
            {
                await _messageService.Send(request, token);
            }
            catch (Exception ex) 
            {
                return Problem(ex.Message); 
            }

            return Ok();
        }

        [HttpGet]
        //[Authorize]
        public async Task<IActionResult> GetMessage(int messageId, CancellationToken token)
        {
            var message = await _messageRepository.Get(messageId, token);
            return Ok(message);
        }

        [HttpPost]
        [Route("getAllMessages")]
        //[Authorize]
        public async Task<IActionResult> GetAllMessagesInChat(GetAllChatRequest request, CancellationToken token)
        {
            var messages = await _messageService.GetAllMessagesInChat(request, token);
            return Ok(messages);
        }

        [HttpDelete]
        //[Authorize]
        public async Task<IActionResult> Delete(int messageId, CancellationToken token)
        {
            var result = await _messageRepository.Delete(messageId, token);
            return result ? Ok("Message was deleted") : Problem("Occured error during deletion");
        }

        [HttpPatch]
        //[Authorize]
        public async Task<IActionResult> Update(MessageEntity message, CancellationToken token)
        {
            await _messageRepository.Update(message, token);
            return Ok();
        }
    }
}
