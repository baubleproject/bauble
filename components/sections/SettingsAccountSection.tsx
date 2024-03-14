import React, { useEffect, useState } from 'react'
import { MemberwithProfile, getProjectMembers } from '@/actions/getProjectMembers'
import { DataTable } from '../tables/SettingsTables/Members/data-table'
import { SettingMemberColumns } from '../tables/SettingsTables/Members/columns'

interface Props {
    projectId: string
}

export default function SettingsAccountSection({ projectId }: Props) {
    const [members, setMembers] = useState<MemberwithProfile[] | null>(null)

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const members = await getProjectMembers({ id: projectId })
                setMembers(members)
            } catch (error) {

            }
        }
        fetchMembers()
    }, [])

    if (!members) {
        return <div>Loading...</div>
    }

    return (
        <div className='p-3 h-full'>
            <DataTable columns={SettingMemberColumns} data={members} />
        </div>

    )
}
