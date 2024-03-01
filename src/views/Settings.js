import { useContext, useCallback, useState, useEffect } from "react";
import { GlobalContext } from "../components/GlobalContex";
import Button from "@enact/sandstone/Button";
//import { Input } from "@enact/sandstone/Input";
import { Input } from "@enact/sandstone/Input";
import BodyText from "@enact/sandstone/BodyText";
import { Cell, Column } from "@enact/ui/Layout";

const Settings = () => {
  const { handleRouteUrl, auth, setAuthData, getAuthData } = useContext(GlobalContext);
  const [username, setUsername] = useState(auth.username);
  const [password, setPassword] = useState(auth.password);
  const [device, setDevice] = useState(auth.device);

  useEffect(() => {
    getAuthData();
  },
		// eslint-disable-next-line
		[])


  const onUserChange = useCallback((data) => {
    setUsername(data.value);
  }, []);

  const onPassChange = useCallback((data) => {
    setPassword(data.value);
  }, []);

  const onDevChange = useCallback((data) => {
    setDevice(data.value);
  }, []);

  const onSave = useCallback(() => {
    console.log(username);
    console.log(password);
    let new_auth = auth;
    new_auth.username = username;
    new_auth.password = password;
    new_auth.device = device;
    setAuthData(new_auth);
    handleRouteUrl("home", 0);
  }, [auth, handleRouteUrl, setAuthData, username, password, device]);

  const onCancel = useCallback(() => {
    handleRouteUrl("home", 0);
  }, [handleRouteUrl]);

  return (
    <div>
      <Column align="center">
        <Cell>
          <BodyText size="large">Username</BodyText>
          <Input
            size="large"
            type="text"
            title="Username"
            placeholder="voyo user"
            defaultValue={auth.username}
            onChange={onUserChange}
          />
        </Cell>
        <Cell>
          <BodyText size="large">Password</BodyText>
          <Input
            size="large"
            type="password"
            title="Password"
            placeholder="voyo pwd"
            defaultValue={auth.password}
            onChange={onPassChange}
          />
        </Cell>
        <Cell>
          <BodyText size="large">Device ID</BodyText>
          <Input
            size="large"
            type="text"
            title="Device ID"
            placeholder="device optional"
            defaultValue={auth.device}
            onChange={onDevChange}
          />
        </Cell>
        <Cell>
          <Button onClick={onSave} size="large">
            Save
          </Button>
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>
        </Cell>
      </Column>
    </div>
  );
};

export default Settings;
