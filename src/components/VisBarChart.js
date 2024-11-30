"use client"

import React, { useState, useEffect }  from 'react';
import dynamic from 'next/dynamic';
import useStore from "@/store";

const CustomBarChart = dynamic(
    ()=> import('./shared/CustomBarChart'), {ssr: false}
)

export default function VisBarChart(props) {
    const { analyzeDataRaw, selectYear, selectDatasetType } = useStore();

    const [data, setData] = useState([])
    const [barDataKeys, setBarDataKeys] = useState(["All: not applied", "All: applied", "Asian: not applied", "Asian: applied"])
    useEffect(()=>{
        const calculateData = (rawDict, rawDatasetType) => {
            const schoolNames = Object.keys(rawDict)
            if(schoolNames.length === 0){
                console.log('No school names')
                return [[], []]
            }
            const res = []
            let dataKeys = []
            if(rawDatasetType === "application/student"){
                for(const schoolName of schoolNames){
                    const currData = rawDict?.[schoolName]?.[selectYear]
                    if(!currData) continue
                    res.push({
                        name: schoolName,
                        "All: not applied": currData["student_demo"]["all_student_count"] - currData["admission/application"]["all_app"],
                        "All: applied": currData["admission/application"]["all_app"],
                        "Asian: not applied": currData["student_demo"]["asian_student_count"] - currData["admission/application"]["asian_app"],
                        "Asian: applied": currData["admission/application"]["asian_app"],
                    })
                }
                dataKeys = ["All: not applied", "All: applied", "Asian: not applied", "Asian: applied"]
            }
            if(rawDatasetType === "admission/application"){
                for(const schoolName of schoolNames){
                    const currData = rawDict?.[schoolName]?.[selectYear]
                    if(!currData) continue
                    res.push({
                        name: schoolName,
                        "All: applied but not admitted": currData["admission/application"]["all_app"] - currData["admission/application"]["all_adm"],
                        "All: applied and admitted": currData["admission/application"]["all_adm"],
                        "Asian: applied but not admitted": currData["admission/application"]["asian_app"] - currData["admission/application"]["asian_adm"],
                        "Asian: applied and admitted": currData["admission/application"]["asian_adm"],
                    })
                }
                dataKeys = ["All: applied but not admitted", "All: applied and admitted", "Asian: applied but not admitted", "Asian: applied and admitted"]
            }
            if(rawDatasetType === "enrollment/admission"){
                for(const schoolName of schoolNames){
                    const currData = rawDict?.[schoolName]?.[selectYear]
                    if(!currData) continue
                    res.push({
                        name: schoolName,
                        "All: admitted but not enrolled": currData["admission/application"]["all_adm"] - currData["enrollment/admission"]["all_enr_count"],
                        "All: admitted and enrolled": currData["enrollment/admission"]["all_enr_count"],
                        "Asian: admitted but not enrolled": currData["admission/application"]["asian_adm"] - currData["enrollment/admission"]["asian_enr_count"],
                        "Asian: admitted and enrolled": currData["enrollment/admission"]["asian_enr_count"],
                    })
                }
                dataKeys = ["All: admitted but not enrolled", "All: admitted and enrolled", "Asian: admitted but not enrolled", "Asian: admitted and enrolled"]
            }

            return [res, dataKeys]
        }

        const newResults = calculateData(analyzeDataRaw, selectDatasetType)
        setData(newResults[0])
        setBarDataKeys(newResults[1])

    }, [analyzeDataRaw, selectDatasetType])

    return (
        <CustomBarChart data={data} barDataKeys={barDataKeys}/>
    )
}