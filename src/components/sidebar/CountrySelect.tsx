import {
  Avatar,
  createListCollection,
  HStack,
  Select,
  useSelectContext,
} from "@chakra-ui/react";

const SelectValue = () => {
  const select = useSelectContext();
  const items = select.selectedItems as Array<{
    name: string;
    flagUrl: string;
  }>;
  const { name, flagUrl } = items[0];
  return (
    <Select.ValueText placeholder="Select country">
      <HStack>
        <Avatar.Root borderRadius="200px" size="2xs">
          <Avatar.Image src={flagUrl} alt={name} />
          <Avatar.Fallback name={name} />
        </Avatar.Root>
        {name}
      </HStack>
    </Select.ValueText>
  );
};

const countries = createListCollection({
  items: [
    {
      code: "NG",
      name: "Nigeria",
      flagUrl: "https://flagcdn.com/w40/ng.png",
    },
    {
      code: "CN",
      name: "China",
      flagUrl: "https://flagcdn.com/w40/cn.png",
    },
    {
      code: "GB",
      name: "England",
      // England uses UK flag for simplicity
      flagUrl: "https://flagcdn.com/w40/gb.png",
    },
    {
      code: "US",
      name: "United States",
      flagUrl: "https://flagcdn.com/w40/us.png",
    },
    {
      code: "AE",
      name: "United Arab Emirates",
      flagUrl: "https://flagcdn.com/w40/ae.png",
    },
  ],
  itemToString: (item) => item.name,
  itemToValue: (item) => item.code,
});

const CountrySelect = () => {
  return (
    <Select.Root
      collection={countries}
      size="md"
      bg="white"
      rounded="lg"
      defaultValue={["GB"]}
      positioning={{ sameWidth: true }}
    >
      <Select.Control>
        <Select.Trigger border={0}>
          <SelectValue />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {countries.items.map((item) => (
            <Select.Item
              item={item}
              key={item.code}
              justifyContent="flex-start"
            >
              <Avatar.Root borderRadius="200px" size="2xs">
                <Avatar.Image
                  src={item.flagUrl}
                  alt={item.name}
                  borderRadius="200px"
                />
                <Avatar.Fallback name={item.name} />
              </Avatar.Root>
              {item.name}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};
export default CountrySelect;
