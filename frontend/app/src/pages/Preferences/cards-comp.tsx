import React from "react";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  useMantineTheme,
  Container,
  Grid,
} from "@mantine/core";
import mockdata from "./datapalsu";

export function CountryCards() {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const cards = mockdata.map((country) => (
    <Card shadow="sm" key={country.title} style={{ minWidth: 240 }}>
      <Image
        src={country.image}
        height={160}
        alt={country.title}
        withPlaceholder
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text weight={500}>{country.title}</Text>
        {country.sale && (
          <Badge
            color="red"
            variant={theme.colorScheme === "dark" ? "light" : "filled"}
          >
            sale
          </Badge>
        )}
      </div>

      <Text size="sm" style={{ color: secondaryColor, minHeight: 140 }}>
        {country.description}
      </Text>

      <hr />

      <Button
        size="sm"
        variant="light"
        color="cyan"
        fullWidth
        style={{ marginTop: 10 }}
      >
        Book tour
      </Button>
    </Card>
  ));

  return (
    <div style={{ backgroundColor: theme.colors.gray[0] }}>
      <Container style={{ paddingTop: 40, paddingBottom: 40 }} size="md">
        <Grid aria-rowspan={3} grow>
          {cards}
        </Grid>
      </Container>
    </div>
  );
}
