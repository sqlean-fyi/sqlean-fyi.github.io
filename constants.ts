
export const DATABASE_SYSTEMS = [
  { value: 'bigquery', label: 'Google BigQuery' },
  { value: 'snowflake', label: 'Snowflake' },
  { value: 'redshift', label: 'Amazon Redshift' },
  { value: 'azure', label: 'Azure Synapse' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgres', label: 'PostgreSQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'dynamodb', label: 'DynamoDB (Scan/Query)' },
];

export const EXAMPLE_CODE = {
  bigquery: `-- This query joins a large fact table with a dimension table.
-- It might be inefficient if tables are not partitioned and clustered correctly.
SELECT
  u.country,
  COUNT(e.event_id) AS total_events
FROM
  \`my-project.my_dataset.events\` AS e
JOIN
  \`my-project.my_dataset.users\` AS u ON e.user_id = u.user_id
WHERE
  e.event_date BETWEEN '2024-01-01' AND '2024-01-31'
GROUP BY
  u.country
ORDER BY
  total_events DESC;`,
  snowflake: `-- This query filters a large table with a WHERE clause on a VARIANT column.
-- This can be slow as it may require a full table scan without proper clustering.
SELECT
  raw_event:event_name::STRING AS event_name,
  COUNT(*) as event_count
FROM
  events_raw_data
WHERE
  raw_event:user_properties.country::STRING = 'USA'
  AND event_timestamp >= '2024-01-01'
GROUP BY 1
ORDER BY 2 DESC;`,
  redshift: `-- This query joins two large tables.
-- If the distribution keys are not aligned with the join keys,
-- it will cause significant data shuffling across the cluster.
SELECT
  c.customer_name,
  SUM(o.order_total) as total_spent
FROM
  public.orders o
JOIN
  public.customers c ON o.customer_id = c.id
WHERE
  o.order_date >= '2024-01-01'
GROUP BY
  c.customer_name
ORDER BY
  total_spent DESC;`,
  azure: `-- This query uses a REPLICATE distribution for a large fact table,
-- which might not be optimal for joins with other large tables.
-- A HASH distribution on the join key could be more efficient.
SELECT
    p.ProductName,
    SUM(s.SalesAmount) AS TotalSales
FROM
    FactInternetSales s
JOIN
    DimProduct p ON s.ProductKey = p.ProductKey
GROUP BY
    p.ProductName
ORDER BY
    TotalSales DESC;
`,
  mysql: `-- This query suffers from an N+1 problem.
-- It fetches posts and then loops to fetch comments for each post individually.
-- A JOIN or a single IN clause query for comments would be better.
SELECT * FROM posts WHERE author_id = 123;
-- In application code:
-- for post in posts:
--   SELECT * FROM comments WHERE post_id = post.id;`,
  postgres: `-- This query performs a text search using LIKE with a leading wildcard,
-- which prevents the use of a standard B-tree index.
-- A trigram index (pg_trgm) would be much more performant.
SELECT
  user_id,
  comment_text
FROM
  user_comments
WHERE
  comment_text LIKE '%optimizing performance%';`,
  mongodb: `// This aggregation pipeline may be inefficient without the proper index.
// An index on { "address.country": 1, "registrationDate": 1 } could improve performance.
db.users.aggregate([
  {
    '$match': {
      'address.country': 'Brazil',
      'registrationDate': {
        '$gte': ISODate('2023-01-01T00:00:00.000Z')
      }
    }
  },
  {
    '$group': {
      '_id': '$accountType',
      'count': { '$sum': 1 }
    }
  },
  {
    '$sort': { 'count': -1 }
  }
])`,
  dynamodb: `{
  "TableName": "ProductCatalog",
  "FilterExpression": "Price > :price_val",
  "ExpressionAttributeValues": {
    ":price_val": {"N": "100"}
  }
}
// This is a Scan operation, which is inefficient and costly for large tables.
// A Query operation on a Global Secondary Index (GSI) on the Price attribute would be better.
`,
};
