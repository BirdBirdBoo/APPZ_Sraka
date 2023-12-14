using Newtonsoft.Json;
using Server.Models.Entities;

namespace Server.Repositories
{
    public class InMemoryChartRepository : IChartsRepository
    {
        private List<ChartEntity> _chartStore = new();

        public InMemoryChartRepository()
        {
            string data = "[{\"id\": 1, \"amount\": 36.5, \"metric\": \"Celsius\", \"hourOfDay\": 8},\r\n    {\"id\": 2, \"amount\": 36.7, \"metric\": \"Celsius\", \"hourOfDay\": 9},\r\n    {\"id\": 3, \"amount\": 37.2, \"metric\": \"Celsius\", \"hourOfDay\": 10},\r\n    {\"id\": 4, \"amount\": 36.8, \"metric\": \"Celsius\", \"hourOfDay\": 11},\r\n    {\"id\": 5, \"amount\": 37.5, \"metric\": \"Celsius\", \"hourOfDay\": 12},\r\n    {\"id\": 6, \"amount\": 38.2, \"metric\": \"Celsius\", \"hourOfDay\": 13},\r\n    {\"id\": 7, \"amount\": 38.5, \"metric\": \"Celsius\", \"hourOfDay\": 14},\r\n    {\"id\": 8, \"amount\": 38.8, \"metric\": \"Celsius\", \"hourOfDay\": 15},\r\n    {\"id\": 9, \"amount\": 37.3, \"metric\": \"Celsius\", \"hourOfDay\": 16},\r\n    {\"id\": 10, \"amount\": 36.9, \"metric\": \"Celsius\", \"hourOfDay\": 17},\r\n    {\"id\": 11, \"amount\": 36.7, \"metric\": \"Celsius\", \"hourOfDay\": 18},\r\n    {\"id\": 12, \"amount\": 36.5, \"metric\": \"Celsius\", \"hourOfDay\": 19},\r\n    {\"id\": 13, \"amount\": 36.4, \"metric\": \"Celsius\", \"hourOfDay\": 20},\r\n    {\"id\": 14, \"amount\": 36.6, \"metric\": \"Celsius\", \"hourOfDay\": 21}]";
            var result = JsonConvert.DeserializeObject<DayChartProperties[]>(data);
            Create(new CreateChartRequest(
                "Динаміка температури протягом дня",
                new DateTime(2023, 12, 1),
                new PatientId(new Guid("9db7b069-826c-4461-a70d-c245b14a1a5d")),
                result));

            data = "[\r\n    {\"id\": 1, \"amount\": 37.5, \"metric\": \"Celsius\", \"hourOfDay\": 8},\r\n    {\"id\": 2, \"amount\": 37.7, \"metric\": \"Celsius\", \"hourOfDay\": 9},\r\n    {\"id\": 3, \"amount\": 38.2, \"metric\": \"Celsius\", \"hourOfDay\": 10},\r\n    {\"id\": 4, \"amount\": 37.8, \"metric\": \"Celsius\", \"hourOfDay\": 11},\r\n    {\"id\": 5, \"amount\": 38.5, \"metric\": \"Celsius\", \"hourOfDay\": 12},\r\n    {\"id\": 6, \"amount\": 39.2, \"metric\": \"Celsius\", \"hourOfDay\": 13},\r\n    {\"id\": 7, \"amount\": 39.5, \"metric\": \"Celsius\", \"hourOfDay\": 14},\r\n    {\"id\": 8, \"amount\": 39.8, \"metric\": \"Celsius\", \"hourOfDay\": 15},\r\n    {\"id\": 9, \"amount\": 38.3, \"metric\": \"Celsius\", \"hourOfDay\": 16},\r\n    {\"id\": 10, \"amount\": 37.9, \"metric\": \"Celsius\", \"hourOfDay\": 17},\r\n    {\"id\": 11, \"amount\": 37.7, \"metric\": \"Celsius\", \"hourOfDay\": 18},\r\n    {\"id\": 12, \"amount\": 37.5, \"metric\": \"Celsius\", \"hourOfDay\": 19},\r\n    {\"id\": 13, \"amount\": 37.4, \"metric\": \"Celsius\", \"hourOfDay\": 20},\r\n    {\"id\": 14, \"amount\": 37.6, \"metric\": \"Celsius\", \"hourOfDay\": 21}\r\n]\r\n";
            result = JsonConvert.DeserializeObject<DayChartProperties[]>(data);
            Create(new CreateChartRequest(
                "Динаміка температури протягом дня",
                new DateTime(2023, 12, 2),
                new PatientId(new Guid("9db7b069-826c-4461-a70d-c245b14a1a5d")),
                result));

            data = "[\r\n    {\"id\": 1, \"amount\": 37.5, \"metric\": \"Celsius\", \"hourOfDay\": 8},\r\n    {\"id\": 2, \"amount\": 37.7, \"metric\": \"Celsius\", \"hourOfDay\": 9},\r\n    {\"id\": 3, \"amount\": 38.2, \"metric\": \"Celsius\", \"hourOfDay\": 10},\r\n    {\"id\": 4, \"amount\": 37.8, \"metric\": \"Celsius\", \"hourOfDay\": 11},\r\n    {\"id\": 5, \"amount\": 38.5, \"metric\": \"Celsius\", \"hourOfDay\": 12},\r\n    {\"id\": 6, \"amount\": 39.2, \"metric\": \"Celsius\", \"hourOfDay\": 13},\r\n    {\"id\": 7, \"amount\": 39.5, \"metric\": \"Celsius\", \"hourOfDay\": 14},\r\n    {\"id\": 8, \"amount\": 39.8, \"metric\": \"Celsius\", \"hourOfDay\": 15},\r\n    {\"id\": 9, \"amount\": 38.3, \"metric\": \"Celsius\", \"hourOfDay\": 16},\r\n    {\"id\": 10, \"amount\": 37.9, \"metric\": \"Celsius\", \"hourOfDay\": 17},\r\n    {\"id\": 11, \"amount\": 37.7, \"metric\": \"Celsius\", \"hourOfDay\": 18},\r\n    {\"id\": 12, \"amount\": 37.5, \"metric\": \"Celsius\", \"hourOfDay\": 19},\r\n    {\"id\": 13, \"amount\": 37.4, \"metric\": \"Celsius\", \"hourOfDay\": 20},\r\n    {\"id\": 14, \"amount\": 37.6, \"metric\": \"Celsius\", \"hourOfDay\": 21}\r\n]\r\n";
            result = JsonConvert.DeserializeObject<DayChartProperties[]>(data);
            Create(new CreateChartRequest(
                "Динаміка температури протягом дня",
                new DateTime(2023, 12, 2),
                new PatientId(new Guid("DD3A8501-B1B0-4CF2-ACB2-0690244882C6")),
                result));
        }

        public ChartEntity Create(CreateChartRequest createChartRequest)
        {
            var (name, date, patientId, properties) = createChartRequest;
            var highestId = _chartStore.Any() ? _chartStore.Max(x => x.Id) : 0;
            var chart = new ChartEntity()
            {
                Id = highestId + 1,
                Name = name,
                Date = date,
                PatientId = patientId,
                Properties = properties
            };
            _chartStore.Add(chart);

            return chart;
        }

        public ChartEntity Get(int id)
        {
            return _chartStore.First(x => x.Id == id);
        }

        public IQueryable<ChartEntity> GetAllChartsQueryable()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ChartEntity> GetAllForPatient(PatientId patientId)
        {
            return _chartStore.Where(x => x.PatientId == patientId).ToList();
        }
    }
}
