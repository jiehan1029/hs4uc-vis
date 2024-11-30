import { create } from 'zustand';


const useStore = create((set) => ({
    // These are supported params of the API endpoint
    SUPPORTED_YEAR_LIST: ["all", "2023", "2022", "2021"],
    SUPPORTED_CAMPUS_LIST: ["all", "individual", "ucb", "ucla", "uci", "ucsd", "ucsb", "ucd"],
    SUPPORTED_SCHOOL_TYPE_LIST: ["all", "public", "private"],

    selectCampus: 'all',
    selectYear: 'all',
    selectSchoolType: 'all',

    setCampus: (campus) => set((state) => {
        if(state.SUPPORTED_CAMPUS_LIST.includes(campus)){
            return { selectCampus: campus}
        } else {
            return { selectCampus: 'all'}
        }
    }),
    setYear: (year) => set((state) => {
        if(state.SUPPORTED_YEAR_LIST.includes(year)){
            return { selectYear: year}
        } else {
            return { selectYear: 'all'}
        }
    }),
    setSchoolType: (schoolType) => set((state) => {
        if(state.SUPPORTED_SCHOOL_TYPE_LIST.includes(schoolType)){
            return { selectSchoolType: schoolType}
        } else {
            return { selectSchoolType: 'all'}
        }
    }),
}))

export default useStore;