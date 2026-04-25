// Dashboard JavaScript - displays stats and charts
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        loadDashboardStats();
        loadChartData();
    });

    async function loadDashboardStats() {
        try {
            const data = await API.get('/api/dashboard');
            console.log('Dashboard data:', data);

            document.getElementById('total-inventory').textContent = data.totalInventory;
            document.getElementById('low-stock').textContent = data.lowStockCount;
            document.getElementById('total-sales').textContent = data.totalSales;
            document.getElementById('total-revenue').textContent = `$${data.totalRevenue.toFixed(2)}`;
        } catch (error) {
            console.error('Failed to load dashboard stats:', error);
            // Use placeholder data for demo
            updatePlaceholderStats();
        }
    }

    function updatePlaceholderStats() {
        document.getElementById('total-inventory').textContent = '24';
        document.getElementById('low-stock').textContent = '3';
        document.getElementById('total-sales').textContent = '48';
        document.getElementById('total-revenue').textContent = '$12,450.00';
    }

    async function loadChartData() {
        // Revenue Chart (Line chart simulation with canvas)
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
            drawRevenueChart(revenueCtx);
        }

        // Status Chart (Pie/Doughnut simulation)
        const statusCtx = document.getElementById('statusChart');
        if (statusCtx) {
            drawStatusChart(statusCtx);
        }
    }

    function drawRevenueChart(canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Sample data for 7 days
        const data = [1200, 1900, 1500, 2200, 2800, 2400, 3100];
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const maxValue = Math.max(...data);

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Draw axes
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, height - 30);
        ctx.lineTo(width - 20, height - 30);
        ctx.moveTo(40, 20);
        ctx.lineTo(40, height - 30);
        ctx.stroke();

        // Plot line
        const padding = 60;
        const plotWidth = width - padding * 2;
        const plotHeight = height - padding * 2;
        const stepX = plotWidth / (data.length - 1);
        const points = [];

        data.forEach((value, i) => {
            const x = padding + i * stepX;
            const y = height - 30 - (value / maxValue) * plotHeight;
            points.push({x, y, value, label: labels[i]});
        });

        // Draw line
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 3;
        ctx.beginPath();
        points.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Draw points
        points.forEach(p => {
            ctx.fillStyle = '#2563eb';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Inter';
        points.forEach(p => {
            ctx.fillText(p.label, p.x - 10, height - 10);
            ctx.fillText(`$${(p.value/1000).toFixed(1)}k`, p.x - 15, p.y - 10);
        });
    }

    function drawStatusChart(canvas) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 40;

        // Sample data
        const data = [
            { label: 'Paid', value: 32, color: '#16a34a' },
            { label: 'Pending', value: 10, color: '#d97706' },
            { label: 'Overdue', value: 6, color: '#dc2626' }
        ];

        const total = data.reduce((sum, d) => sum + d.value, 0);
        let currentAngle = -Math.PI / 2;

        // Clear
        ctx.clearRect(0, 0, width, height);

        data.forEach(segment => {
            const sliceAngle = (segment.value / total) * Math.PI * 2;
            ctx.fillStyle = segment.color;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            currentAngle += sliceAngle;
        });

        // Labels
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Payment Status', centerX, centerY - 10);

        // Legend
        let legendY = height - 40;
        data.forEach((segment, i) => {
            ctx.fillStyle = segment.color;
            ctx.fillRect(20, legendY - 2, 12, 12);
            ctx.fillStyle = '#374151';
            ctx.font = '12px Inter';
            ctx.textAlign = 'left';
            ctx.fillText(segment.label, 40, legendY + 8);
            legendY += 20;
        });
    }
})();
