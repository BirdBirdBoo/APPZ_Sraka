using System.Text.Json.Serialization;
using Server.Models.Dtos.Doctor;
using Server.Models.Entities;

namespace Server.Models.Dtos;

public record LoginResponseNewDto(UserId UserId,
                                  string Token,
                                  [property: JsonConverter(typeof(JsonStringEnumConverter))]
                                  UserRole Role,
                                  UserDataDto UserData,
                                  DoctorId? PatientDoctorId = default,
                                  PatientId? UserAsPatientId = default,
                                  DoctorId? UserAsDoctorId = default,
                                  DoctorEntityWithUserData? PatientDoctorInfo = default,
                                  PatientEntity? UserAsPatientInfo = default,
                                  DoctorEntityWithPatients? UserAsDoctorInfo = default);