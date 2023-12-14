const RootPath = '/app';

const ApplicationPaths = {
    RootPath,
    LoginPage: `${RootPath}/login`,
    RegisterPage: `${RootPath}/register`,
    LogoutPage: `${RootPath}/logout`,
    UserInfoPage: `${RootPath}/userInfo`,
    ProfilePage: `${RootPath}/patientProfile`,
    PatientChat: `${RootPath}/patientChat`,
    ChartsPage: `${RootPath}/chartsPage`,
    PatientsPage: `${RootPath}/patientsPage`,
    AnalysisPage: `${RootPath}/analysisPage`
}

Object.seal(ApplicationPaths);

export default ApplicationPaths;