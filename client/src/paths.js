const RootPath = '/app';

const ApplicationPaths = {
    RootPath,
    LoginPage: `${RootPath}/login`,
    RegisterPage: `${RootPath}/register`,
    LogoutPage: `${RootPath}/logout`,
    UserInfoPage: `${RootPath}/userInfo`,
    ProfilePage: `${RootPath}/patientProfile`,
    PatientChat: `${RootPath}/patientChat`,
    StatsPage: `${RootPath}/statsPage`,
    PatientsPage: `${RootPath}/patientsPage`,
    AnalysisPage: `${RootPath}/analysisPage`
}

Object.seal(ApplicationPaths);

export default ApplicationPaths;