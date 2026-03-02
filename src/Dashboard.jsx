import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { logout } from "./services/auth";
import './Dashboard.css'


/* dummy data */
const navItems=[
  { label:"Dashboard", icon: "fa-solid fa-grip", active: true },
  { label:"Store Related", icon: "fa-solid fa-store" },
  { label:"Reports", icon: "fa-solid fa-chart-bar" },
  { label:"GRN", icon: "fa-solid fa-clipboard" },
  { label:"Invoice", icon: "fa-solid fa-file-invoice" },
  { label:"Stock Transfers", icon: "fa-solid fa-right-left" },
  { label:"User Accounts", icon: "fa-solid fa-users" },
  { label:"Product Related", icon: "fa-solid fa-box" },
  { label:"E-Products", icon: "fa-solid fa-desktop" },
];

const statusData=[
  { title: 'Total Orders', value: '1,284', change: '+12.5%', positive: true, subtitle: 'vs last week', bars: [40, 65, 45, 80, 55, 70, 90], color: '#6366f1', bgColor: '#eef2ff', iconBg: '#6366f1', icon: 'fa-solid fa-cart-shopping' },
  { title: 'Total Sales', value: '₹8,42,500', change: '+8.2%', positive: true, subtitle: 'vs last week', bars: [50, 35, 70, 60, 85, 75, 95], color: '#22c55e', bgColor: '#f0fdf4', iconBg: '#22c55e', icon: 'fa-solid fa-indian-rupee-sign' },
  { title: 'Avg Order Value', value: '₹656', change: '-3.1%', positive: false, subtitle: 'vs last week', bars: [70, 60, 55, 45, 50, 40, 35], color: '#f59e0b', bgColor: '#fffbeb', iconBg: '#f59e0b', icon: 'fa-solid fa-bullseye' },
  { title: 'Gross Margin', value: '24.8%', change: '+1.4%', positive: true, subtitle: 'vs last week', bars: [45, 55, 60, 50, 65, 70, 80], color: '#ec4899', bgColor: '#fdf2f8', iconBg: '#ec4899', icon: 'fa-solid fa-chart-line' },
]

const topProducts = [
  { name: 'Dairy Milk Silk', category: 'Chocolates', sales: '₹24,500', growth: '+18.5%', positive: true, trend: [30, 50, 45, 65, 80] },
  { name: 'Red Bull 250ml', category: 'Energy Drinks', sales: '₹18,200', growth: '+12.3%', positive: true, trend: [40, 35, 55, 60, 75] },
  { name: 'Coca Cola 500ml', category: 'Soft Drinks', sales: '₹15,800', growth: '+8.7%', positive: true, trend: [50, 55, 45, 60, 65] },
  { name: 'Lays Classic', category: 'Chips', sales: '₹12,400', growth: '-2.1%', positive: false, trend: [60, 55, 50, 45, 40] },
  { name: 'Tropicana Orange', category: 'Fruit Juice', sales: '₹9,800', growth: '+5.4%', positive: true, trend: [35, 40, 50, 55, 65] },
];
const rankBgColors = ['#fef9c3', '#f1f5f9', '#fff7ed', '#f9fafb', '#f9fafb'];
const rankTextColors = ['#ca8a04', '#475569', '#c2410c', '#6b7280', '#6b7280'];

const categoryRanking = [
  { name: 'Chocolates', sales: '₹1,24,500', units: '2,450', share: 28, color: '#6366f1' },
  { name: 'Energy & Sports Drinks', sales: '₹98,200', units: '1,820', share: 22, color: '#22c55e' },
  { name: 'Soft Drinks', sales: '₹85,600', units: '3,200', share: 19, color: '#f59e0b' },
  { name: 'Chips', sales: '₹62,400', units: '1,560', share: 14, color: '#ec4899' },
  { name: 'Fruit Juice & Drinks', sales: '₹48,300', units: '980', share: 11, color: '#8b5cf6' },
];

export default function dashboard(){
    
    const navigate = useNavigate();
    const handleLogout = () => {
       logout();           
       navigate("/login"); 
     };

    const [dateOpen ,setDateOpen]=useState(false);
    const [range,setRange]=useState('Last 7 days');
    const [quickAction,setQuickAction]=useState(false);
    return (
        <div className='dashboard-layout'>
            <aside className='sidebar'>
                {/* logo section */}
                <div className='sidebar-logo'>
                    <div className='sidebar-logo-icon'>NS</div>
                    <div className='sidebar-logo-text'>
                        <div className='sidebar-logo-title'>New Shop</div>
                        <div className='sidebar-logo-subtitle'>Retail Management</div>
                    </div>
                </div>
            {/* profile section */}
            <div className='sidebar-profile'>
                <div className='sidebar-profile-avatar'>AD</div>
                <div className='sidebar-profile-text'>
                     <div className='sidebar-profile-name'>Admin</div>
                     <div className='sidebar-profile-email'>admin123@gmail.com</div>
                </div>
                <div className='sidebar-profile-status'></div>
            </div>
            {/* nav-items */}
            <nav className='sidebar-nav'>
                <div className='sidebar-nav-label'>Main Menu</div>
                {navItems.map((item)=>(
                    <button key={item.label}
                    className={`nav-btn ${item.active ? "active" : ""}`} >
                      <i className={`${item.icon} nav-icon`} />
                      {item.label}
                    </button>
                ))}
            </nav>
            {/* logout */}
            <div className='sidebar-logout'>
                <button className='logout-btn' onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket" />
                    Logout 
                </button>
            </div>
            </aside>

          {/* main content */}
                <main className='main-content'>
                    <header className='header'>
                        <div className='header-left'>
                            <div>
                                <h1 className='header-title'>Dashboard Overview</h1>
                                <p className='header-breadcrumb'>Home / Dashboard / 
                                <span className='header-breadcrumb-active'>Overview</span>
                                </p>
                            </div>
                        </div>
                        <div className='header-action'>
                            {/* date range */}
                            <div className='date-wrap'>
                              <button className='date-range'
                                onClick={()=>setDateOpen(!dateOpen)}
                                >
                                <i className="fa-regular fa-calendar" />
                                {range}
                                <i className="fa-solid fa-chevron-down" />
                              </button>
                              {dateOpen && (
                                <div className='dropdown-menu'>
                                    {["Last 7 days","Last 1 month","Last 1 year"].map((date)=>(
                                        <button 
                                        key={date}
                                        className='dropdown-item'
                                        onClick={()=>{
                                            setRange(date)
                                            setDateOpen(false)
                                        }}
                                        >{date}</button>
                                    ))}
                                </div>
                              )}
                            </div>
                            {/* export */}
                            <button className='export-btn'>
                                <i className="fa-solid fa-download" />
                                Export
                            </button>
                            {/* quick action */}
                            <div className='quick-wrap'>
                                <button className='quick-btn'
                                  onClick={()=>setQuickAction(!quickAction)}
                                >
                                    <i className="fa-solid fa-bolt" />
                                    Quick Actions
                                    <i className="fa-solid fa-chevron-down" />
                                </button>
                                {quickAction && (
                                    <div className='dropdown-menu'>
                                        {[
                                            'Invoice',
                                            'Add Product',
                                            'Block User',
                                            'Generate Report'
                                        ].map((action)=>(
                                            <button  key={action} className='dropdown-item'>{action}</button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    {/* status cards */}
                    <div className="kpi-grid"> 
                      {statusData.map((status)=>(
                        <div key={status.title} className='kpi-card'>
                            <div className='kpi-accent'
                             style={{ background: `linear-gradient(90deg, ${status.color}, ${status.color}88)` }}
                            />
                            <div className='kpi-top'>
                                <div>
                                     <p className="kpi-label">{status.title}</p>
                                     <h2 className="kpi-value">{status.value}</h2>
                                </div>
                                <div className="kpi-icon" style={{ backgroundColor: status.iconBg }}>
                                      <i className={`${status.icon} kpi-fa-icon`} />
                                </div>
                            </div>
                            <div className='kpi-bottom'>
                                <div className='kpi-change-wrap'>
                                    <span className={`kpi-change ${status.positive ? 'positive' : 'negative'}`}>
                                       <i className={`fa-solid ${status.positive ? 'fa-caret-up' : 'fa-caret-down'} kpi-arrow`} />
                                       {status.change}
                                    </span>
                                    <span className="kpi-subtitle">{status.subtitle}</span>
                                </div>
                                <div className='kpi-bars'>
                                    {status.bars.map((h,i)=>(
                                        <div
                                        key={i}
                                        className='kpi-bar'
                                        style={{
                                            height: h * 0.32,
                                            backgroundColor: i === status.bars.length - 1
                                            ? status.color
                                            : status.color + '33',
                                        }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                      ))}
                    </div>
                    {/* inventory grid */}
                    <div className='inventory-grid'>
                        {/* topProducts table */}
                        <div className='inv-card'>
                            <div className='inv-card-header'>
                                <div>
                                    <h3 className='inv-card-title'>Top Products</h3>
                                    <p className='inv-card-sub'>Best performing products</p>
                                </div>
                                <button className='view-btn'>View All</button>
                            </div>

                            <div className='inv-table-wrap'>
                                <table className='inv-table'>
                                    <thead>
                                        <tr>
                                            {['Product Name', 'Sales', 'Growth', 'Trend'].map((h)=>(
                                                <th key={h}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topProducts.map((p, idx) => (
                                            <tr key={p.name} className={idx < topProducts.length - 1 ? 'row-border' : ''}>
                                                <td>
                                                    <div className="product-cell">
                                                        <div
                                                           className="product-rank"
                                                           style={{ backgroundColor: rankBgColors[idx], color: rankTextColors[idx] }}
                                                           > {idx + 1}
                                                        </div>
                                                         <div>
                                                             <div className="product-name">{p.name}</div>
                                                             <div className="product-category">{p.category}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="product-sales">{p.sales}</td>
                                                <td>
                                                    <span className={`growth-badge ${p.positive ? 'positive' : 'negative'}`}>
                                                        <i className={`fa-solid ${p.positive ? 'fa-caret-up' : 'fa-caret-down'} growth-arrow`} />
                                                        {p.growth}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="trend-bars">
                                                        {p.trend.map((h, i) => (
                                                            <div 
                                                            key={i}
                                                            className="trend-bar"
                                                            style={{
                                                                  height: h * 0.24,
                                                                  backgroundColor: p.positive
                                                                  ? (i === p.trend.length - 1 ? '#22c55e' : '#22c55e44')
                                                                  : (i === p.trend.length - 1 ? '#ef4444' : '#ef444444'),
                                                            }}
                                                            />
                                                        ))}
                                                    </div>
                                                </td> 
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Top Category */}
                        <div className='inv-card'>
                            <div className='inv-card-header'>
                                <div>
                                    <h3 className='inv-card-title'>Top Categories</h3>
                                    <p className='inv-card-sub'>Perfomance by category</p>
                                </div>
                                <button className='view-btn'>Details</button>
                            </div>

                            <div className='cat-list'>
                                {categoryRanking.map((cat,idx)=>(
                                    <div key={cat.name} className='cat-card'>
                                        <div className='cat-card-top'>
                                            <div className='cat-card-left'>
                                                <div
                                                  className='cat-rank'
                                                  style={{ backgroundColor: cat.color + '18', color: cat.color }}
                                                >
                                                {idx + 1}
                                                </div>
                                                <div className="cat-name">{cat.name}</div>
                                            </div>
                                             <div className="cat-sales">{cat.sales}</div>
                                        </div>   
                                        <div className="cat-meta">
                                            <div className="cat-meta-item">
                                                 Units: <span className="cat-meta-value">{cat.units}</span>
                                            </div>
                                            <div className="cat-meta-item">
                                                Share: <span className="cat-meta-value">{cat.share}%</span>
                                            </div>
                                        </div> 
                                        <div className="cat-progress-bg">
                                            <div
                                            className="cat-progress-fill"
                                            style={{ width: `${cat.share * 3}%`, backgroundColor: cat.color }}
                                            />
                                        </div>
                                    </div>  
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
        </div>
    
    )
}