import { create } from 'zustand';


const useStore = create((set, get) => ({
    // These are supported params of the API endpoint
    SUPPORTED_YEAR_LIST: ["2023", "2022", "2021"],
    SUPPORTED_CAMPUS_LIST: ["ucb", "ucla", "uci", "ucsd", "ucsb", "ucd"],
    SUPPORTED_SCHOOL_TYPE_LIST: ["public"],
    SUPPORTED_DATASET_TYPE_LIST: ["application/student", "admission/application", "enrollment/admission"],
    CUSTOM_DATASET_TYPE_CAPTIONS: {
        "application/student": "How many (out of total) students applied for the univeristy.",
        "admission/application": "How many (out of total application) students are admitted.",
        "enrollment/admission": "How many (out of total admitted) students are enrolled in the university."
    },

    selectCampus: 'ucb',
    selectYear: '2023',
    selectSchoolType: 'public',
    selectDatasetType: "application/student",

    page: 1,
    pageSize: 10,

    isFetchAnalyzeDataInflight: false,
    analyzeDataRaw: {},

    setCampus: (campus) => set((state) => {
        if(state.SUPPORTED_CAMPUS_LIST.includes(campus)){
            return { selectCampus: campus}
        } else {
            return { selectCampus: 'ucb'}
        }
    }),
    setYear: (year) => set((state) => {
        if(state.SUPPORTED_YEAR_LIST.includes(year)){
            return { selectYear: year}
        } else {
            return { selectYear: '2023'}
        }
    }),
    setSchoolType: (schoolType) => set((state) => {
        if(state.SUPPORTED_SCHOOL_TYPE_LIST.includes(schoolType)){
            return { selectSchoolType: schoolType}
        } else {
            return { selectSchoolType: 'public'}
        }
    }),
    setDatasetType: (datasetType) => set((state) => {
        if(state.SUPPORTED_DATASET_TYPE_LIST.includes(datasetType)){
            return { selectDatasetType: datasetType}
        } else {
            return { selectDatasetType: "application/student"}
        }
    }),

    setPage: (newPage) => set(()=>({page: newPage})),
    goToNextPage: async ()=>{
        get().setPage(get().page+1)
        await get().fetchAnalyzeData()
    },
    goToPrevPage: async ()=>{
        get().setPage(get().page-1)
        await get().fetchAnalyzeData()
    },

    setAnalyzeDataRaw: (data) => set(()=>({analyzeDataRaw: data})),
    setFetchAnalyzeDataInflight: (inflight) => set(()=>({isFetchAnalyzeDataInflight: inflight})),
    fetchAnalyzeData: async () => {
        get().setFetchAnalyzeDataInflight(true)
        const params = {
            select_campus: get().selectCampus,
            select_year: get().selectYear,
            select_school_type: get().selectSchoolType,
            page: get().page,
            page_size: get().pageSize,
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