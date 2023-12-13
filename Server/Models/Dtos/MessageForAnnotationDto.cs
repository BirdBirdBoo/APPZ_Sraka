using Server.Models.Entities;

namespace Server.Models.Dtos
{
    public class MessageForAnnotationDto
    {
        public UserId Sender { get; set; }
        public string Text { get; set; } = null!;
    }
}
