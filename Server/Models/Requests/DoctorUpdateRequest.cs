namespace Server.Models.Requests
{
    public record DoctorUpdateRequest(
        float Rating,
        string Proffesion,
        float Experience
        )
    {
    }
}
