interface StructuredDataProps {
  data: Record<string, any> | Record<string, any>[];
}

/**
 * Component to inject JSON-LD structured data into the page head
 * @param data - Single schema object or array of schema objects
 */
export default function StructuredData({ data }: Readonly<StructuredDataProps>) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((schema) => {
        // Generate a unique key based on schema type and context
        const schemaType = schema['@type'] || 'Unknown';
        const uniqueKey = `structured-data-${schemaType}-${JSON.stringify(schema).substring(0, 50)}`;

        return (
          <script
            key={uniqueKey}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema, null, 2),
            }}
          />
        );
      })}
    </>
  );
}
