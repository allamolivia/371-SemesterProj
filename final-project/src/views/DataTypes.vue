<script lang="ts">
export type UserType = {
    courses: string[],
    fname: string,
    lname: string,
    role: string
}

export type CourseType = {
    name: string,
    proffname: string,
    proflname: string,
    profuid: string,
    studentIds: string[],
    code: string,
    startTime: number,
    endTime: number,
    startDate: string,
    schedule: string[]
}
</script>