import { db, transactions } from "@bank-brew/db";

export default async function Test() {
  try {
    const transaction = await db.select().from(transactions);

    return (
      <table>
        <th>
          <td>Transaction ID</td>
          <td>Title</td>
          <td>Amount</td>
          <td>Sender</td>
          <td>Recipient</td>
        </th>

        {transaction.map((t) => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.title}</td>
            <td>{t.amount}</td>
            <td>{t.senderClerkUserId}</td>
            <td>{t.recipientClerkUserId}</td>
          </tr>
        ))}
      </table>
    );
  } catch (error) {
    return <div>something went wrong</div>;
  }
}
