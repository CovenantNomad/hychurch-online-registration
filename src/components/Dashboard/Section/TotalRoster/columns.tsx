"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { DataTableColumnHeader } from "./DataTableHeader"

export type TRegistraion = {
  userId: string
  name: string
  introducer: string
  gender: string
  birthday: string
  postcode: string
  address: string
  marriageStatus: string
  phoneNumber: string
  profileUrl: string
  registrationDate: string
  faithExperience: string
}

export const columns: ColumnDef<TRegistraion>[] = [
  {
    id: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="순서"/>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <span>{row.id}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "introducer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="인도자"/>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <span>{row.getValue('introducer')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이름"/>
    ),
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/registration/${row.original.userId}`}
        >
          <div className="flex justify-center">
            <span className="hover:text-blue-600">{row.getValue('name')}</span>
          </div>
        </Link>
      )
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="성별"/>
    ),
  },
  {
    accessorKey: "marriageStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="결혼관계"/>
    ),
  },
  {
    accessorKey: "birthday",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="생년월일"/>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="휴대폰번호"/>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="주소"/>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col max-w-52">
          <span className="block">{"("+row.original.postcode+")"}</span>
          <span className="block">{row.getValue('address')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "faithExperience",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="신앙경력"/>
    ),
  },
  {
    accessorKey: "registrationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="등록일"/>
    ),
  },
  {
    accessorKey: "profileUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="사진 URL"/>
    ),
    cell: ({ row }) => {

      return (
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={row.original.profileUrl} />
          </Avatar>
          <Link
            href={row.original.profileUrl}
            target="_blank"
          >
            <Badge variant="outline">크게보기</Badge>
          </Link>
        </div>
      )
    },
  },
]


