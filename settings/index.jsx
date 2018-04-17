function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Time Color</Text>}>
        <ColorSelect
          settingsKey="timeColor"
          colors={[
            {color: "tomato"},
            {color: "sandybrown"},
            {color: "#FFFF00"},
            {color: "#00FFFF"},
            {color: "deepskyblue"},
            {color: "plum"}
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Date Settings</Text>}>
        <Toggle settingsKey="showDate" label="Show date" />
        <ColorSelect
          settingsKey="dateColor"
          colors={[
            {color: "tomato"},
            {color: "sandybrown"},
            {color: "#FFFF00"},
            {color: "#00FFFF"},
            {color: "deepskyblue"},
            {color: "plum"}
          ]}
        />
      </Section>
    </Page>);
}

registerSettingsPage(mySettings);