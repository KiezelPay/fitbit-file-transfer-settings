function mySettings(props) {
  const { settings, settingsStorage } = props;

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
    </Page>);
}

registerSettingsPage(mySettings);