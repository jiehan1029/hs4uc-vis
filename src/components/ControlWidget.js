"use client"

import CustomSelect from "./shared/CustomSelect"
import useStore from "@/store";

export default function ControlWidget(){
    const {
        SUPPORTED_YEAR_LIST,
        SUPPORTED_CAMPUS_LIST,
        SUPPORTED_SCHOOL_TYPE_LIST,
        selectCampus,
        selectYear,
        selectSchoolType,
        setCampus,
        setYear,
        setSchoolType
    } = useStore();
    
    const yearOptions = SUPPORTED_YEAR_LIST.map(year=>({label: year.toUpperCase(), key: year.toLowerCase()}))
    const campusOptions = SUPPORTED_CAMPUS_LIST.map(campus=>({label: campus.toUpperCase(), key: campus.toLowerCase()}))
    const schoolTypeOptions = SUPPORTED_SCHOOL_TYPE_LIST.map(type=>({label: type.toUpperCase(), key: type.toLowerCase()}))

    const onSelectChange = (selectType="year", newValue)=>{
        console.log('****** inselectchange, ', selectType, newValue)
        if(selectType === "year"){
            setYear(newValue)
        }
        if(selectType === "campus"){
            setCampus(newValue)
        }
        if(selectType === "schoolType"){
            setSchoolType(newValue)
        }
    }
    const onYearSelectChange = (e) => onSelectChange("year", e.target.value)
    const onCampusSelectChange = (e) => onSelectChange("campus", e.target.value)
    const onSchoolTypeSelectChange = (e) => onSelectChange("schoolType", e.target.value)
    return (
        <div className="ControlWidget w-full flex justify-center">
            <CustomSelect label="Year of Univ Admission"
                options={yearOptions}
                selectedKeys={[selectYear]}
                onSelectChange={onYearSelectChange}/>
            <CustomSelect label="UC Campus" customClassName="mh-12"
                options={campusOptions}
                selectedKeys={[selectCampus]}
                onSelectChange={onCampusSelectChange}/>
            <CustomSelect label="Type of High School"
                options={schoolTypeOptions}
                selectedKeys={[selectSchoolType]}
                onSelectChange={onSchoolTypeSelectChange}/>
        </div>
    )
}