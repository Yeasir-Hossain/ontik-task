"use client"

import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HttpResponse } from '@/types';
import { HttpResponseDetailsDialog } from '@/components/HttpResponseDetailsDialog';
import { fetchResponses } from '@/lib/api';
import { getSocket } from '@/lib/socket';
import Loading from '@/components/Loader';

export default function HttpResponseTable() {
  const [selectedResponse, setSelectedResponse] = useState<HttpResponse | null>(null);
  const [responses, setResponses] = useState<HttpResponse[]>([])
  const [pagination, setPagination] = useState({
    total: 1,
    page: 1,
    pages: 1
  })
  const [loading, setLoading] = useState(true)

  const loadResponses = async (page?: number) => {
    try {
      const { data, pagination: paginationData } = await fetchResponses(page)
      setResponses(data)
      setPagination(paginationData)
    } catch (error) {
      console.error('Failed to fetch responses', error)
    } finally {
      setLoading(false);
    }
  }

  const columns: ColumnDef<HttpResponse>[] = [
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      cell: ({ row }) => new Date(row.original.timestamp).toLocaleString()
    },
    {
      accessorKey: 'responseData.method',
      header: 'Method',
    },
    {
      accessorKey: 'statusCode',
      header: 'Status',
    },
    {
      accessorKey: 'responseTime',
      header: 'Response Time (ms)',
    },
    {
      accessorKey: 'responseData.origin',
      header: 'Origin',
    },
    {
      id: 'actions',
      header: 'Details',
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedResponse(row.original)}
        >
          View Details
        </Button>
      )
    }
  ];

  const handlePaginationChange = (newPage: { page: number }) => {
    loadResponses(newPage.page)
    setPagination(prev => ({
      ...prev,
      page: newPage.page
    }))
  }

  useEffect(() => {

    loadResponses()

    const socket = getSocket()
    socket.on('newResponse', (newResponse: HttpResponse) => {
      setResponses(prev => [newResponse, ...prev.slice(0, 9)])
    })

    return () => {
      socket.off('newResponse')
    }

  }, [])

  return (
    <Card className="w-full container my-10">
      <CardHeader>
        <CardTitle>HTTP Monitor Responses</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <Loading className="animate-spin h-7 w-7" />
          </div>
        ) :
          <>
            <DataTable columns={columns} data={responses} pagination={pagination} onPaginationChange={handlePaginationChange} />

            <HttpResponseDetailsDialog
              response={selectedResponse}
              onClose={() => setSelectedResponse(null)}
            />
          </>
        }

      </CardContent>
    </Card>
  );
}