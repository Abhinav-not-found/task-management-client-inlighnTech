const Header = () => {
  const date = new Date();
  const fullDate = date.toUTCString();
  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );

  return (
    <div className='border px-4 py-2 w-fit rounded-md'>
      <p className='font-semibold'>{monthName}</p>
      <p className='text-muted-foreground text-xs'>
        Today is {dayName}, {fullDate.slice(4, 16)}
      </p>
    </div>
  );
};

export default Header;
