using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Models.Requests
{
    public record CreateAnnotationRequest(MessageForAnnotationDto message, AnnotationEntity annotation);
}
