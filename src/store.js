import { create } from 'zustand';


const useStore = create((set, get) => ({
    // These are supported params of the API endpoint
    SUPPORTED_YEAR_LIST: ["all", "2023", "2022", "2021"],
    SUPPORTED_CAMPUS_LIST: ["all", "individual", "ucb", "ucla", "uci", "ucsd", "ucsb", "ucd"],
    SUPPORTED_SCHOOL_TYPE_LIST: ["all", "public", "private"],

    selectCampus: 'all',
    selectYear: 'all',
    selectSchoolType: 'all',

    isFetchAnalyzeDataInflight: false,
    analyzeDataRaw: {},

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

    setAnalyzeDataRaw: (data) => set(()=>({analyzeDataRaw: data})),
    setFetchAnalyzeDataInflight: (inflight) => set(()=>({isFetchAnalyzeDataInflight: inflight})),
    fetchAnalyzeData: async () => {
        get().setFetchAnalyzeDataInflight(true)
        const params = {
            select_campus: get().selectCampus,
            select_year: get().selectYear,
            select_school_type: get().selectSchoolType,
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/analyze?` + new URLSearchParams(params).toString())
        if(response.status === 200){
            get().setAnalyzeDataRaw(await response.json())
        } else{
            console.error("response code:", response.status, ", text: ", response.text)
            get().setAnalyzeDataRaw({})
        }
        get().setFetchAnalyzeDataInflight(false)
    }
}))

export default useStore;