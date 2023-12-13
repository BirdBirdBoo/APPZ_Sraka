using Server.Models.Entities;

namespace Server.Models.Requests
{
    public record CreateAnnotationRequest(MessageEntity message, AnnotationEntity annotation);
}
