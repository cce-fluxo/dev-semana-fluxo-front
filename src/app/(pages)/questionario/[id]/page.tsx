export default async function Questao({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <div>My Post: {id}</div>
}