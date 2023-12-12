using AutoMapper;
using Server.Models.Dtos.Doctor;
using Server.Models.Entities;

namespace Server.Models.Mappers
{
    public class DoctorProfile: Profile
    {
        public DoctorProfile()
        {
             CreateMap<DoctorDto, DoctorEntity>();
             CreateMap<DoctorDto, UserEntity>();
        }
    }
}
