using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Services
{
    public class CriticalDefinerServiceMocked : ICriticalDefinerService
    {
        public IEnumerable<AnalysisDto> Define(AnalysisEntity analysis)
        {
            var data = JsonConvert.DeserializeObject<AnalysisDto[]>(analysis.Data);

            foreach (var analysisData in data)
            {
                var number = analysisData.Number;
                var delta = GetRandomNumber(-number * 0.3, number * 0.3);
                analysisData.Delta = delta;
            }

            return data;
        }

        private bool DoCreateMock()
        {
            Random random = new();
            random.Next(1, 100);

            return random.Next(1, 100) <= 50;
        }

        public double GetRandomNumber(double minimum, double maximum)
        {
            Random random = new Random();
            return random.NextDouble() * (maximum - minimum) + minimum;
        }
    }
}
