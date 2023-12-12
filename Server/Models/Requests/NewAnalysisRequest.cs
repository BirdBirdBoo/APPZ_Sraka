namespace Server.Models.Requests;

public record NewAnalysisRequest(
    string name,
    string description,
    string type,
    DateTime date,
    string provider,
    string data
    );
