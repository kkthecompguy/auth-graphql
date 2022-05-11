
interface Props {
  children: React.ReactNode
}

function Layout(props: Props) {
  return (
    <div className='container'>
      {props.children}
    </div>
  );
}

export default Layout;