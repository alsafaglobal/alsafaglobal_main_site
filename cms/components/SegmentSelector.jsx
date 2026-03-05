import React, { useEffect, useState } from 'react'
import { Select, Stack, Text } from '@sanity/ui'
import { set, unset, useClient } from 'sanity'

export function SegmentSelector(props) {
  const { onChange, value, elementProps } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const [segments, setSegments] = useState([])

  useEffect(() => {
    client
      .fetch(`*[_type == "segmentsPage"][0].segments[]{ title, slug }`)
      .then((result) => setSegments(result || []))
  }, [client])

  return (
    <Stack space={2}>
      <Select
        {...elementProps}
        value={value || ''}
        onChange={(e) => {
          const val = e.currentTarget.value
          onChange(val ? set(val) : unset())
        }}
      >
        <option value="">— Select a segment —</option>
        {segments.map((seg, i) => (
          <option key={i} value={seg.slug}>
            {seg.title}
          </option>
        ))}
      </Select>
      {value && (
        <Text size={1} muted>
          Will link to: /divisions#{value}
        </Text>
      )}
    </Stack>
  )
}
