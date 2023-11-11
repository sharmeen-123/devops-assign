import React, {useState, useEffect} from 'react';
import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconMapPin, IconClock } from '@tabler/icons-react';
import axios from 'axios';


const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    width:"1.6rem"
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));


export function UserInfoIcons({ avatar, name, title, location, startTime }) {
  const { classes } = useStyles();
  const [time, setTime] = useState();
  const [address, setAddress] = useState();

  const timer = () => {
    // Set the given time in the format "YYYY-MM-DDTHH:MM:SS"
    const givenTime = startTime;

    // Get the current time
    const currentTime = new Date();

    // Calculate the difference in milliseconds
    const timeDiff = currentTime.getTime() - new Date(givenTime).getTime();

    // Convert the difference to hours, minutes, and seconds
    let hours = Math.floor(timeDiff / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    let seconds = Math.floor((timeDiff / 1000) % 60);
    if(hours.toString().length === 1){
      
      hours = '0'+hours.toString()
    }
    if(minutes.toString().length === 1){
      
      minutes = '0'+minutes.toString()
    }
    if(seconds.toString().length === 1){
      
      seconds = '0'+seconds.toString()
    }

    setTime(hours+" : "+minutes+" : "+seconds)


  }

  const getAddress = async (latitude, longitude) => {
    try {

        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
        const addresss = response.data.display_name;
        setAddress(addresss)

        // setCheckinAddress(address2)
        //   return(address);
    } catch (error) {
        console.error(error);
    }
};

  useEffect(() => {
    const interval = setInterval(() => {
      timer();
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    getAddress(location.latitude, location.longitude)
  }, []);
  
  return (
    <div>
      <Group noWrap style={{ border: "2px solid rgb(226, 225, 225)", margin: "2.5%", boxShadow: "0px 0px 3px 3px rgb(226, 225, 225)", borderRadius: "15px" }}>
        <Avatar src={avatar} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {title}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconClock stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {time}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconMapPin stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {address}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}