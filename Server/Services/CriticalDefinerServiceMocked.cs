using Newtonsoft.Json;
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
            var data = JsonConvert.DeserializeObject<AnalysisDto[]>(analysis.Data!);
            var random = CreateSeededMockRandom(analysis);

            if (data == null)
            {
                throw new NullReferenceException("Analysis data is empty");
            }

            foreach (var analysisData in data)
            {
                if (DoCreateMock(random))
                {
                    var number = analysisData.Number;
                    var delta = GetRandomNumber(random, -number * MockedDeltaInPercent, number * MockedDeltaInPercent);
                    analysisData.Delta = delta;
                    analysisData.IsCritical = (Math.Abs(delta) / number) >= CriticalDeltaThreshold;
                }
            }

            return data;
        }

        private Random CreateSeededMockRandom(AnalysisEntity entity)
        {
            var seed = entity.Patient.PatientId.Value.GetHashCode();
            seed += entity.Date.Date.GetHashCode();
            seed += entity.Date.Hour;
            return new Random(seed);
        }

        private bool DoCreateMock(Random random)
        {
            return random.Next(1, 100) <= 50;
        }

        private double GetRandomNumber(Random random, double minimum, double maximum)
        {
            return random.NextDouble() * (maximum - minimum) + minimum;
        }
    }
}