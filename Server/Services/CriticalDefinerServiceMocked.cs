using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Services
{
    public class CriticalDefinerServiceMocked : ICriticalDefinerService
    {
        private const double MockedDeltaInPercent = 0.5;
        private const double CriticalDeltaThreshold = 0.3;

        public IEnumerable<AnalysisDto> Define(AnalysisEntity analysis)
        {
            var data = JsonConvert.DeserializeObject<AnalysisDto[]>(analysis.Data);

            foreach (var analysisData in data)
            {
                if (DoCreateMock())
                {
                    var number = analysisData.Number;
                    var delta = GetRandomNumber(-number * MockedDeltaInPercent, number * MockedDeltaInPercent);
                    analysisData.Delta = delta;
                    analysisData.IsCritical = Math.Abs(delta) >= CriticalDeltaThreshold;
                }
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
