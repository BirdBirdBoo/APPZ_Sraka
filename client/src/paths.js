const RootPath = '/app';

const ApplicationPaths = {
    RootPath,
    LoginPage: `${RootPath}/login`,
    RegisterPage: `${RootPath}/register`,
    LogoutPage: `${RootPath}/logout`,
    UserInfoPage: `${RootPath}/userInfo`,
    PatientProfile: `${RootPath}/patientProfile`,
    PatientChat: `${RootPath}/patientChat`,
    StatsPage: `${RootPath}/statsPage`
}

Object.seal(ApplicationPaths);

export default ApplicationPaths;