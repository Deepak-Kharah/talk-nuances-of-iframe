import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  cta: string;
}

export function ResourceCard(props: ResourceCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col h-[100%]">
        <h3 className="font-semibold mb-2">{props.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {props.description}
        </p>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(props.url, "_blank")}
        >
          {props.cta ?? "Learn More"}
        </Button>
      </CardContent>
    </Card>
  );
}
