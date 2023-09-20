import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CardInfoProps {
  title: string;
  caption: string;
  icon: React.ReactNode;
  value: number | string;
}

export default function CardInfo(props: CardInfoProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        {props.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
        <p className="text-muted-foreground text-xs">{props.caption}</p>
      </CardContent>
    </Card>
  );
}
