export interface IAppState {
    auth: IAuthState | undefined,
    course:ICourseState|undefined,
    classes:IClassState|undefined,
    subject:ISubjectState|undefined,
    teacher:ITeacherState|undefined,
    student:IStudentState|undefined,
    user:IUserState|undefined,
    schedule:IScheduleState|undefined,
    notification:INotificationState|undefined,
    rcStudent:IRcStudentState|undefined
}

export interface IAuthState {
    isLoading: boolean,
    loginSuccess: boolean,
    id: string,
    Type: string,
    User:object
  }

export interface ICourseState {
    isLoading: boolean,
    isAdding: boolean,
    isEditing: boolean,
    isRemoving: boolean,
    isActing: boolean,
    isRefreshing: boolean,
    courseList: any,
    pagination: object,
    courseItem: object
}

export interface IClassState {
    isLoading: boolean,
    isAdding: boolean,
    isEditing: boolean,
    isRemoving: boolean,
    isActing: boolean,
    isRefreshing: boolean,
    classList: any,
    pagination: object,
    classItem: object
}
export interface ISubjectState {
    isLoading: boolean,
    isAdding: boolean,
    isEditing: boolean,
    isRemoving: boolean,
    isActing: boolean,
    isRefreshing: boolean,
    subjectList: any,
    pagination: object,
    subjectItem: object
}

export interface ITeacherState {
    isLoading: boolean,
    isAdding: boolean,
    isEditing: boolean,
    isRemoving: boolean,
    isActing: boolean,
    isRefreshing: boolean,
    teacherList: any,
    pagination: object,
    teacherItem: object
}

export interface IStudentState {
    isLoading: boolean,
    isAdding: boolean,
    isEditing: boolean,
    isRemoving: boolean,
    isActing: boolean,
    isRefreshing: boolean,
    studentList: any,
    studentCourceList:any,
    StudentSheduleList:any,
    pagination: object,
    studentItem: object
}

export interface IUserState {
    isLoading: boolean,
    isAdding: boolean,
    isEditing: boolean,
    isRemoving: boolean,
    isActing: boolean,
    isRefreshing: boolean,
    userList: any,
    pagination: object,
    userItem: object
}

export interface IScheduleState {
    isLoading: boolean,
    isAdding: boolean,
    isEditing: boolean,
    isRemoving: boolean,
    isActing: boolean,
    isRefreshing: boolean,
    scheduleList: any,
    pagination: object,
    year:any,
    semeter:any,
    course:any,
    scheduleItem: object
}

export interface INotificationState {
    isLoading: boolean,
    isAdding: boolean,
    isEditing: boolean,
    isRemoving: boolean,
    isActing: boolean,
    isRefreshing: boolean,
    notificationList: any,
    pagination: object,
    notificationItem: object
}


export interface IRcStudentState {
    isLoading: boolean,
    isAdding: boolean,
    isEditing: boolean,
    isRemoving: boolean,
    isActing: boolean,
    isRefreshing: boolean,
    rcStudentList: any,
    pagination: object,
    CourceList:any,
    StudentList:any
}


